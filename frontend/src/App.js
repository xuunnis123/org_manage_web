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
import StudentCreateScreen from './screens/StudentCreateScreen'
import StudentEditScreen from './screens/StudentEditScreen'

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
          <Route path='/school/detail/:id' component={SchoolDetailScreen} />
          <Route path='/school/:id/edit' component={SchoolEditScreen} />
          
          <Route path='/student' component={StudentScreen} exact/>
          <Route path='/student/create' component={StudentCreateScreen} />
          <Route path='/student/:id/edit' component={StudentEditScreen} />
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;
