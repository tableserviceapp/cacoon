'use client';

import { Fragment } from 'react';
import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import Proof from '@/components/sections/Proof';
import Companies from '@/components/sections/Companies';
import Vision from '@/components/sections/Vision';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

const HEADLINE = 'Stop applying.\nStart getting matched.';
const SUB =
  'Cocoon is an AI career platform that builds rich profiles, scores your fit against every role, and helps you close the gap. Be first in.';
const CTA = 'Join the waitlist';

export default function Home() {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const headline = HEADLINE.split('\n').map((line, i, arr) => (
    <Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </Fragment>
  ));

  return (
    <>
      <Nav onJoin={scrollToJoin} />
      <Hero headline={headline} sub={SUB} ctaLabel={CTA} onJoin={scrollToJoin} />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Proof />
      <Companies onCompanyJoin={scrollToJoin} />
      <Vision />
      <FinalCTA />
      <Footer />
    </>
  );
}
