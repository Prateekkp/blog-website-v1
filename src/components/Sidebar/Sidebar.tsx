import React from 'react';
import { Post } from '../../types/post';
import { NewsletterForm } from '../NewsletterForm/NewsletterForm';
import { PopularList } from '../PopularList/PopularList';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  popularPosts: Post[];
}

export const Sidebar: React.FC<SidebarProps> = ({ popularPosts }) => {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar Content">
      <NewsletterForm id="subscribe" />
      <PopularList posts={popularPosts} />
    </aside>
  );
};

export default Sidebar;
