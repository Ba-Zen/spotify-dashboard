import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from '../menu/menu.component';
import UserProfile from '../user-profile/userProfile';
import RecentlyPlayed from '../recentlyPlayed/recentlyPlayed';
import TopArtists from '../topArtists/topArtists';
import TopTracks from '../topTracks/topTracks';

const Profile = () => (
  <>
    <Menu />
    <Switch>
      <Route exact path='/' component={UserProfile} />
      <Route exact path='/recently-played' component={RecentlyPlayed} />
      <Route exact path='/top-artists' component={TopArtists} />
      <Route exact path='/top-tracks' component={TopTracks} />
    </Switch>
  </>
);

export default Profile;
