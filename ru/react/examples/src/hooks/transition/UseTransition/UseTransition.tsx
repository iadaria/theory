import {Suspense, useState, useTransition} from 'react';
import {AboutTab} from '../AboutTab';
import {PostsTab} from './PostsTab';
import { ContactTab } from '../ContactTab';

function TabButton({children, isActive, clickOnTab, color}: any) {
  const [isPending, startTransition] = useTransition();

  // Если активная то просто надпись
  if (isActive) {
    return <b>{children}</b>;
  }

  if (isPending) {
    return <b className="pending">
      🌀 {children}
      </b>;
  }

  return <button className='c-button' onClick={() => {
    startTransition(clickOnTab)
  }}>{children}</button>;
}

export function UseTransition() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab: string) {
    setTab(nextTab);
  }

  return (
    <Suspense fallback={<h1>🌀 Loading ...</h1>}>
      <p>Use Transition</p>
      <TabButton
        isActive={tab === 'about'}
        clickOnTab={() => selectTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        clickOnTab={() => selectTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        clickOnTab={() => selectTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </Suspense>
  );
}
