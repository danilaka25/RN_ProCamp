import { SwiperStackRoutes } from '../tabs/Swiper';
import { ChatStackRoutes } from '../tabs/Chat';
import { ProfileStackRoutes } from '../tabs/Profile';
import AuthenticationRoutes from './authentication';
import RootRoutes from './root';

const Routes = {
  authentication: AuthenticationRoutes,
  chat: ChatStackRoutes,
  root: RootRoutes,
  swiper: SwiperStackRoutes,
  profile: ProfileStackRoutes,
};

export default Routes;