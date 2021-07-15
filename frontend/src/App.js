import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'


import CaseScreen from './screens/CaseScreen'
import SchoolScreen from './screens/SchoolScreen'
import SchoolCreateScreen from './screens/SchoolCreateScreen'

function App() {
  return (
    <Router>
      <Header />
      
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />

          <Route path='/case' component={CaseScreen} />

          <Route path='/school' component={SchoolScreen} exact/>
          <Route path='/school/create' component={SchoolCreateScreen} />
        
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;
