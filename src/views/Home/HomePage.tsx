import { About } from './components/About/About';
import { Features } from './components/Features/Features';
import { Welcome } from './components/Welcome/Welcome';

import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="HomePage">
      <Welcome />
      <Features />
      <About />
    </div>
  );
};

export default HomePage;
