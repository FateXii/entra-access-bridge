
import { useState } from 'react';
import { useCourses } from '@/hooks/useCourses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Users, Clock } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface CourseCatalogProps {
  onCourseSelect?: (courseId: string) => void;
}

export function CourseCatalog({ onCourseSelect }: CourseCatalogProps) {
  const { data: courses, isLoading } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses?.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.grade_level.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Catalog</h1>
          <p className="text-gray-600">Discover courses to enhance your learning</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{course.grade_level}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.student_count} students
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration_hours}h
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{course.instructor_name}</span>
                <Button 
                  size="sm" 
                  onClick={() => onCourseSelect?.(course.id)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}
