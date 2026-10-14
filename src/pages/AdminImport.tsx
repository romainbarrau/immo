import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Link2, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImportResult {
  url: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
  reference?: string;
}

const AdminImport = () => {
  const [urls, setUrls] = useState('');
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);

  const handleImport = async () => {
    const urlList = urls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0 && url.includes('seedrealestate.pt'));

    if (urlList.length === 0) {
      toast.error('Veuillez entrer au moins une URL valide');
      return;
    }

    setImporting(true);
    const initialResults: ImportResult[] = urlList.map(url => ({
      url,
      status: 'pending',
    }));
    setResults(initialResults);

    for (let i = 0; i < urlList.length; i++) {
      const url = urlList[i];
      
      try {
        console.log('Importing:', url);
        
        const { data, error } = await supabase.functions.invoke('import-property', {
          body: { url },
        });

        if (error) throw error;

        if (data.error) {
          setResults(prev => prev.map((r, idx) => 
            idx === i 
              ? { ...r, status: 'error', message: data.error, reference: data.reference }
              : r
          ));
          toast.error(`Erreur: ${data.error}`);
        } else {
          setResults(prev => prev.map((r, idx) => 
            idx === i 
              ? { 
                  ...r, 
                  status: 'success', 
                  message: 'Importé avec succès',
                  reference: data.property.reference 
                }
              : r
          ));
          toast.success(`${data.property.reference} importé avec succès`);
        }
      } catch (error: any) {
        console.error('Import error:', error);
        setResults(prev => prev.map((r, idx) => 
          idx === i 
            ? { ...r, status: 'error', message: error.message }
            : r
        ));
        toast.error(`Erreur lors de l'import`);
      }

      // Small delay between requests
      if (i < urlList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    setImporting(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Import de propriétés</h1>
          <p className="text-muted-foreground mt-2">
            Collez les URLs des propriétés depuis seedrealestate.pt (une par ligne)
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">URLs des propriétés</label>
            <Textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://www.seedrealestate.pt/pt/propiedad/..."
              rows={10}
              className="font-mono text-sm"
              disabled={importing}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Exemple: https://www.seedrealestate.pt/pt/propiedad/moradia-t3-santa-maria-maior
            </p>
          </div>

          <Button
            onClick={handleImport}
            disabled={importing || !urls.trim()}
            className="w-full"
            size="lg"
          >
            {importing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Import en cours...
              </>
            ) : (
              <>
                <Link2 className="mr-2 h-4 w-4" />
                Importer les propriétés
              </>
            )}
          </Button>

          {results.length > 0 && (
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Résultats de l'import</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded border bg-card"
                  >
                    {result.status === 'pending' && (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mt-0.5" />
                    )}
                    {result.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    )}
                    {result.status === 'error' && (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono truncate">{result.url}</p>
                      {result.message && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {result.message}
                        </p>
                      )}
                      {result.reference && (
                        <p className="text-xs font-semibold mt-1">
                          Ref: {result.reference}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminImport;
