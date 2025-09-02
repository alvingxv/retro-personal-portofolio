// API functions for portfolio data
// Now reads from JSON files instead of hardcoded data

import profileData from '@/data/profile.json';
import toolboxData from '@/data/toolbox.json';
import contactsData from '@/data/contacts.json';
import navigationData from '@/data/navigation.json';
import configData from '@/data/config.json';
import projectsData from '@/data/projects.json';
import experienceData from '@/data/experience.json';

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
}

export interface ToolboxItem {
  name: string;
  icon: string;
  category: string;
}

export interface Contact {
  type: string;
  value: string;
  link: string;
  icon: string;
}

export interface NavItem {
  title: string;
  path: string;
  icon: string;
}

export interface FeatureConfig {
  enabled: boolean;
  comingSoonMessage: string;
}

export interface Config {
  features: {
    gallery: FeatureConfig;
    blog: FeatureConfig;
    projects: FeatureConfig;
  };
  experience: {
    showSummary: boolean;
  };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
}

// Mock data - in real app this would come from APIs
export const fetchProfile = async (): Promise<ProfileData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return profileData;
};

export const fetchToolbox = async (): Promise<ToolboxItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return toolboxData;
};

export const fetchContacts = async (): Promise<Contact[]> => {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return contactsData;
};

export const fetchNavigation = async (): Promise<NavItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return navigationData;
};

export const fetchConfig = async (): Promise<Config> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return configData;
};

export const isFeatureEnabled = async (featureName: keyof Config['features']): Promise<boolean> => {
  const config = await fetchConfig();
  return config.features[featureName]?.enabled || false;
};

export const getFeatureConfig = async (featureName: keyof Config['features']): Promise<FeatureConfig> => {
  const config = await fetchConfig();
  return config.features[featureName];
};

export const fetchProjects = async (): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return projectsData as Project[];
};

export const fetchExperience = async (): Promise<Experience[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return experienceData as Experience[];
};