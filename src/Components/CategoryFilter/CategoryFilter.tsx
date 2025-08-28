
import { Button } from '../ui/button';
import { useCategories } from '../../hooks/useCategories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-10 w-40 rounded px-3 py-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3">Categories</h3>
        <div className="text-center py-4">
          <p className="text-red-600 text-sm mb-2">Error loading categories</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            size="sm"
            className="text-xs"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const allCategories = ['all', ...(categories || [])];

  return (
    <div className="mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3">Filter by Category</h3>
      <Select onValueChange={onCategoryChange} value={selectedCategory}>
        <SelectTrigger className="w-[200px] capitalize">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {allCategories.map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category === 'all' ? 'All Products' : category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
  


