import React from 'react';
import CourseSkeleton from './CourseSkeleton';
import Course from './Course';

const MyLearning = () => {
    const isLoading = false;
    const MyLearningCourse = [1];

    return (
        <div className="max-w-7xl mx-auto my-10 px-4 md:px-0 ">
            <h1 className="font-bold text-2xl">My Learning</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 mt-4">
                {isLoading ? (
                    // Show skeleton loaders when loading
                    [...Array(4)].map((_, i) => <CourseSkeleton key={i} />)
                ) : MyLearningCourse.length === 0 ? (
                    // Show message when no courses are enrolled
                    <p>You are not enrolled in any course.</p>
                ) : (
                    // Render courses when available
                    MyLearningCourse.map((course, i) => <Course key={i}/>)
                )}
            </div>
        </div>
    );
};

export default MyLearning;
