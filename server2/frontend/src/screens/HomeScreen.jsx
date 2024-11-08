import axios from 'axios';
import Hero from '../components/Hero';

axios.defaults.withCredentials = true;
const HomeScreen = () => {
  return <Hero />;
};
export default HomeScreen;
