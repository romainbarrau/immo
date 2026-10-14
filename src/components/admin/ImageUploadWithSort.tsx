import { useState } from 'react';
import { X, Upload, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageItem {
  id: string;
  preview: string;
  file?: File;
  url?: string;
}

interface ImageUploadWithSortProps {
  images: ImageItem[];
  onImagesChange: (images: ImageItem[]) => void;
}

const SortableImage = ({ image, onRemove }: { image: ImageItem; onRemove: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-muted rounded-lg overflow-hidden"
    >
      <img
        src={image.preview}
        alt="Preview"
        className="w-full h-32 object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          type="button"
          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5 text-foreground" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-2 bg-destructive/90 rounded-full hover:bg-destructive transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export const ImageUploadWithSort = ({ images, onImagesChange }: ImageUploadWithSortProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      onImagesChange(arrayMove(images, oldIndex, newIndex));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      preview: URL.createObjectURL(file),
      file,
    }));

    onImagesChange([...images, ...newImages]);
  };

  const removeImage = (id: string) => {
    const image = images.find((img) => img.id === id);
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    onImagesChange(images.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Images (Glissez-déposez pour réorganiser)</Label>
        <Button type="button" variant="outline" size="sm" asChild>
          <label className="cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Ajouter des images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </Button>
      </div>

      {images.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  onRemove={() => removeImage(image.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Aucune image sélectionnée. Cliquez sur "Ajouter des images" pour commencer.
          </p>
        </div>
      )}
    </div>
  );
};
