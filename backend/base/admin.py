from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(School)
admin.site.register(Student)
admin.site.register(Case)
admin.site.register(InCome)
admin.site.register(OutCome)
admin.site.register(Member)
admin.site.register(Data)
admin.site.register(OrgData)
admin.site.register(Scholarship)
admin.site.register(IncomeContributeContext)
admin.site.register(IncomeContributeItem)
admin.site.register(OutcomeContributeContext)
admin.site.register(OutcomeContributeItem)
admin.site.register(CaseData)
admin.site.register(IncomeMoneyCategory)
admin.site.register(OutcomeMoneyCategory)
admin.site.register(Semester)
admin.site.register(ScholarshipWithOutcomeRelation)
admin.site.register(StudentsPhotoLink)