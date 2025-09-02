import { Profile } from '@/components/Profile';
import { Experience } from '@/components/Experience';
import { Toolbox } from '@/components/Toolbox';
import { Contacts } from '@/components/Contacts';

const Index = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center min-h-full">
      <Profile />
      
      <div className="mb-6">
        <Experience />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Toolbox />
        <Contacts />
      </div>
    </div>
  );
};

export default Index;
