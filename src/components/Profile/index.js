import React from 'react'

import avatar from '../../assets/img/avatar.jpeg'
import GithubIcon from '../../assets/icon/github.svg'
import LinkedinIcon from '../../assets/icon/linkedin.svg'

import * as styles from './styles.css'

export const Profile = () => (
  <div className={styles?.body}>
    <img className={styles?.avatar} src={avatar} alt="avatar" />
    <h1 className={styles?.name}>Thiago Feijó</h1>
    <h2 className={styles?.role}>Software Developer</h2>
    <ul className={styles?.ul}>
      <li className={styles?.li}>
        <a href="https://github.com/thiagofeijodev/" target="_black" aria-label="Github">
          <GithubIcon alt="Github link" />
        </a>
      </li>
      <li className={styles?.li}>
        <a href="https://www.linkedin.com/in/thiagofeijodev/" target="_black" aria-label="LinkedIn">
          <LinkedinIcon alt="Linkedin link" />
        </a>
      </li>
    </ul>
  </div>
);

export default Profile;