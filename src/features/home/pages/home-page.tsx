"use client";

import GithubSection from "../components/github-section";
import ExperienceSection from "../components/experience-section";
import ProjectsSection from "../components/projects-section";
import StackSection from "../components/stack-section";
import PublicationsSection from "../components/publications-section";
import CertificationsSection from "../components/certifications-section";

const HomePage = () => {
  return (
    <>
      <GithubSection />

      <ExperienceSection />

      <ProjectsSection />

      <StackSection />

      <PublicationsSection />

      <CertificationsSection />
    </>
  );
};
export default HomePage;
