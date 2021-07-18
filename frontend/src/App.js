import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'


import CaseScreen from './screens/CaseScreen'

import SchoolScreen from './screens/SchoolScreen'
import SchoolCreateScreen from './screens/SchoolCreateScreen'
import SchoolEditScreen from './screens/SchoolEditScreen'
import SchoolDetailScreen  from './screens/SchoolDetailScreen'

import StudentScreen  from './screens/StudentScreen'

function App() {
  return (
    <Router>
      <Header />
      
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />

          <Route path='/case' component={CaseScreen} />

          <Route path='/school' component={SchoolScreen} exact/>
          <Route path='/school/:id' component={SchoolDetailScreen} exact/>
          <Route path='/school/create' component={SchoolCreateScreen} />
          <Route path='/school/:id/edit' component={SchoolEditScreen} />
          
          <Route path='/student' component={StudentScreen} exact/>
          
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;
