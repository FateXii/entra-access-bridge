
import { useCourse } from '@/hooks/useCourses';
import { useEnrollment, useEnrollInCourse } from '@/hooks/useEnrollments';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Users, Clock, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface CourseDetailsProps {
  courseId: string;
  onBack: () => void;
}

export function CourseDetails({ courseId, onBack }: CourseDetailsProps) {
  const { data: course, isLoading } = useCourse(courseId);
  const { data: enrollment, isLoading: enrollmentLoading } = useEnrollment(courseId);
  const enrollMutation = useEnrollInCourse();
  const { user } = useAuth();

  const handleEnroll = () => {
    if (!user || !course) return;
    enrollMutation.mutate(courseId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Course not found.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const isEnrolled = !!enrollment;

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Catalog
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{course.grade_level}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-2xl">{course.title}</CardTitle>
              <CardDescription className="text-lg">{course.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.student_count} students
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration_hours} hours
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {course.instructor_name}
                </div>
              </div>
              <p className="text-gray-700">{course.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Language</h4>
                      <p className="text-gray-600">{course.language}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Duration</h4>
                      <p className="text-gray-600">{course.duration_hours} hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Course curriculum details will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Student reviews will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {isEnrolled ? 'Enrolled' : 'Enroll in Course'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEnrolled ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">You are enrolled in this course</span>
                </div>
              ) : (
                <Button 
                  onClick={handleEnroll} 
                  className="w-full" 
                  disabled={enrollMutation.isPending || enrollmentLoading}
                >
                  {enrollMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    'Enroll Now'
                  )}
                </Button>
              )}
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{course.duration_hours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span>{course.student_count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span>{course.rating}/5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{course.instructor_name}</p>
                  <p className="text-sm text-gray-600">Course Instructor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
