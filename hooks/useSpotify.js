import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const {data: session, status} = useSession();

  useEffect(() => {
    if (session) {
      // jika refresh token failed maka akan login ulang
      if (session.error === 'RefreshAccessTokenError') {
        signIn('spotify', null, {prompt: 'login'});
      }
      spotifyApi.setAccessToken(session.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
