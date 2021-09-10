import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'


import CaseScreen from './screens/CaseScreen'
import CaseCreateStudentScreen from './screens/CaseCreateStudentScreen'
import CaseCreatePhotoScreen from './screens/CaseCreatePhotoScreen'
import CaseCreateFinanceScreen from './screens/CaseCreateFinanceScreen'
import CaseCreateScholarshipScreen from './screens/CaseCreateScholarshipScreen'
import CaseCreateConfirmScreen from './screens/CaseCreateConfirmScreen'
import CaseCreateStudentConfirmScreen from './screens/CaseCreateStudentConfirmScreen'

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
import SettingOutcomeContributeCreateScreen from './screens/SettingOutcomeContributeCreateScreen'
import SettingOutcomeMoneyCategoryCreateScreen from './screens/SettingOutcomeMoneyCategoryCreateScreen'
import SettingIncomeMoneyCategoryCreateScreen from './screens/SettingIncomeMoneyCategoryCreateScreen'
import SettingIncomeContributeEditScreen from './screens/SettingIncomeContributeEditScreen'
import SettingOutcomeContributeEditScreen from './screens/SettingOutcomeContributeEditScreen'
import SettingIncomeMoneyCategoryEditScreen from './screens/SettingIncomeMoneyCategoryEditScreen'
import SettingOutcomeMoneyCategoryEditScreen from './screens/SettingOutcomeMoneyCategoryEditScreen'


import FinanceScreen from './screens/FinanceScreen'
import FinanceIncomeCreateScreen from './screens/FinanceIncomeCreateScreen'
import FinanceIncomeEditScreen from './screens/FinanceIncomeEditScreen'
import FinanceOutcomeEditScreen from './screens/FinanceOutcomeEditScreen'
import FinanceOutcomeCreateScreen from './screens/FinanceOutcomeCreateScreen'

import ScholarshipScreen from './screens/ScholarshipScreen'
import ScholarshipCreateScreen from './screens/ScholarshipCreateScreen'
import ScholarshipEditScreen from './screens/ScholarshipEditScreen'

import SemesterScreen from './screens/SemesterScreen'
import SemesterCreateScreen from './screens/SemesterCreateScreen'
import SemesterEditScreen from './screens/SemesterEditScreen'

function App() {
  return (
    <Router>
      <Header />
      
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />

          <Route path='/case' component={CaseScreen} exact/>
          <Route path='/case/createstudent' component={CaseCreateStudentScreen} />
          <Route path='/case/confirmedstudent' component={CaseCreateStudentConfirmScreen} />
          <Route path='/case/createphoto' component={CaseCreatePhotoScreen} />
          <Route path='/case/createfinance' component={CaseCreateFinanceScreen} />
          <Route path='/case/createscholarship' component={CaseCreateScholarshipScreen} />
          <Route path='/case/createconfirm/:id' component={CaseCreateConfirmScreen} />

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
          <Route path='/finance/income/:id/edit' component={FinanceIncomeEditScreen} />

          <Route path='/finance/outcome/create' component={FinanceOutcomeCreateScreen} />
          <Route path='/finance/outcome/:id/edit' component={FinanceOutcomeEditScreen} />


          <Route path='/setting' component={SettingScreen} exact/>
          <Route path='/setting/income/contributecontext/create' component={SettingIncomeContributeCreateScreen} />
          <Route path='/setting/outcome/contributecontext/create' component={SettingOutcomeContributeCreateScreen} />
          <Route path='/setting/income/moneycategory/create' component={SettingIncomeMoneyCategoryCreateScreen} />
          <Route path='/setting/outcome/moneycategory/create' component={SettingOutcomeMoneyCategoryCreateScreen} />
          <Route path='/setting/outcome/moneycategory/:id/edit' component={SettingOutcomeMoneyCategoryEditScreen} />
          <Route path='/setting/income/moneycategory/:id/edit' component={SettingIncomeMoneyCategoryEditScreen} />
          <Route path='/setting/outcome/contributecontext/:id/edit' component={SettingOutcomeContributeEditScreen} />
          <Route path='/setting/income/contributecontext/:id/edit' component={SettingIncomeContributeEditScreen} />
          
          <Route path='/scholarship' component={ScholarshipScreen} exact/>
          <Route path='/scholarship/create' component={ScholarshipCreateScreen} />
          <Route path='/scholarship/:id/edit' component={ScholarshipEditScreen} />

          <Route path='/semester' component={SemesterScreen} exact/>
          <Route path='/semester/create' component={SemesterCreateScreen} />
          <Route path='/semester/:id/edit' component={SemesterEditScreen} />
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;
