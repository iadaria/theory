
import {useState} from 'react';
import {PostsTab} from './PostsTab';
import {ContactTab} from '../ContactTab';
import {AboutTab} from '../AboutTab';

function TabButton({children, isActive, onClick}: any) {
  // Если активная то просто надпись
  if (isActive) {
    return <b>{children}</b>;
  }

  return (
    <button className='btn' onClick={onClick}>
      {children}
    </button>
  );
}

export function WithoutTransition() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab: string) {
    setTab(nextTab);
  }

  return (
    <>
      <p>Without Transition</p>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => selectTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => selectTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        onClick={() => selectTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
}
