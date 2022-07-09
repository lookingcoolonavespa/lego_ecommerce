import React from 'react';
import FacebookSvg from './svg/FacebookSvg';
import TwitterSvg from './svg/TwitterSvg';
import InstagramSvg from './svg/InstagramSvg';
import YoutubeSvg from './svg/YoutubeSvg';

export default function SocialsCtn({ iconSize = '24px' }) {
  return (
    <div className="socials_ctn">
      <div className="social_wrapper">
        <FacebookSvg size={iconSize} />
      </div>
      <div className="social_wrapper">
        <TwitterSvg size={iconSize} />
      </div>
      <div className="social_wrapper">
        <InstagramSvg size={iconSize} />
      </div>
      <div className="social_wrapper">
        <YoutubeSvg size={iconSize} />
      </div>
    </div>
  );
}
