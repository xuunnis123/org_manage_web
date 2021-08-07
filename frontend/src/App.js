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

import MemberScreen from './screens/MemberScreen'
import MemberCreateScreen from './screens/MemberCreateScreen'
import MemberEditScreen from './screens/MemberEditScreen'

import SettingScreen from './screens/SettingScreen'

import SettingIncomeContributeCreateScreen from './screens/SettingIncomeContributeCreateScreen'

import FinanceScreen from './screens/FinanceScreen'
import FinanceIncomeCreateScreen from './screens/FinanceIncomeCreateScreen'
import FinanceIncomeDetailScreen from './screens/FinanceIncomeDetailScreen'
import FinanceIncomeEditScreen from './screens/FinanceIncomeEditScreen'

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

          <Route path='/member' component={MemberScreen} exact/>
          <Route path='/member/create' component={MemberCreateScreen} />
          <Route path='/member/:id/edit' component={MemberEditScreen} />

          <Route path='/finance' component={FinanceScreen} exact/>
          <Route path='/finance/income/create' component={FinanceIncomeCreateScreen} />
          <Route path='/finance/income/:id' component={FinanceIncomeDetailScreen} />
          <Route path='/finance/income/:id/edit' component={FinanceIncomeEditScreen} />

          <Route path='/setting' component={SettingScreen} exact/>
          <Route path='/setting/income/contributecontext/create' component={SettingIncomeContributeCreateScreen} />
          <Route path='/setting/outcome/contributecontext/create' component={SettingScreen} />
          <Route path='/setting/income/moneycategory/create' component={SettingScreen} />
          <Route path='/setting/outcome/moneycategory/create' component={SettingScreen} />
          <Route path='/setting/outcome/moneycategory/:id/edit' component={SettingScreen} />
          <Route path='/setting/income/moneycategory/:id/edit' component={SettingScreen} />
          <Route path='/setting/outcome/contributecontext/:id/edit' component={SettingScreen} />
          <Route path='/setting/income/contributecontext/:id/edit' component={SettingScreen} />
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;
