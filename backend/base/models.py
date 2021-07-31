from django.db import models

from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
# Create your models here.

class SocialAccount(models.Model):
    provider = models.CharField(max_length=200, default='google') # 若未來新增其他的登入方式,如Facebook,GitHub...
    unique_id = models.CharField(max_length=200)
    user = models.ForeignKey(
        User, related_name='social', on_delete=models.CASCADE)

class Semester(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200)
    year = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return self.name
        
class School(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    represent_person_name = models.CharField(max_length=200, null=True, blank=True)
    represent_person_phone = models.CharField(max_length=200, null=True, blank=True)
    memo = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True)
    phone = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    tags = models.CharField(max_length=200, null=True, blank=True) #分區
    is_end = models.BooleanField(default=False)
    memo = models.CharField(max_length=200, null=True, blank=True)
    file = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return str(self.name)

class ContributeContext(models.Model): #資助項目
    _id = models.AutoField(primary_key=True, editable=False)
    context = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.context)

class ContributeItem(models.Model):
    item_name = models.ForeignKey(ContributeContext, on_delete=models.SET_NULL, null=True,related_name="contribute_context")
    student_name = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True,related_name="contribute_studnet")
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True, default=0)
    semester = models.ForeignKey(
         Semester, on_delete=models.SET_NULL, null=True,related_name="contribute_item_semester")
    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
class Case(models.Model):
    case_no = models.CharField(max_length=200, null=True, blank=True)
    student_name = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name="student_case")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now = True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.student_name)



class Member(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    job = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=200,null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    family = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True,related_name="member_family_User")
    intro_by = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name="member_family_Intro")
    memo = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MoneyCategory(models.Model): #傳票號數種類
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200)
    detail = models.CharField(max_length=200)

    def __str__(self):
        return self.name 


class OutCome(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    category = models.ForeignKey(MoneyCategory,on_delete=models.SET_NULL, null=True,related_name="outcome_category")
    subject = models.CharField(max_length=200,null=True,blank=True)
    title = models.ForeignKey(ContributeContext,on_delete=models.SET_NULL, null=True,related_name="outcome_contribute_context")
    to_whom = models.ForeignKey(Student,on_delete=models.SET_NULL, null=True,related_name="outcome_to_whom")
    detail = models.CharField(max_length=200,null=True,blank=True)
    outcome_money = models.IntegerField(null=True, blank=True, default=0)
    unit = models.CharField(max_length=200, default="NTD")
    confirmed_person = models.ForeignKey(Member,on_delete=models.SET_NULL, null=True,related_name="member_outcome" )
    modified_at = models.DateTimeField(auto_now = True)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.title) + ":" + str(self.to_whom)

class InCome(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    category = models.ForeignKey(MoneyCategory,on_delete=models.SET_NULL, null=True,related_name="income_category")
    subject = models.CharField(max_length=200,null=True,blank=True)
    title = models.ForeignKey(ContributeContext,on_delete=models.SET_NULL, null=True,related_name="income_contribute_context")
    from_whom = models.ForeignKey(Member,on_delete=models.SET_NULL, null=True,related_name="income_from_whom")
    detail = models.CharField(max_length=200,null=True,blank=True)
    income_money = models.IntegerField(null=True, blank=True, default=0)
    unit = models.CharField(max_length=200, default="NTD")
    confirmed_person = models.ForeignKey(Member,on_delete=models.SET_NULL, null=True,related_name="member_income" )
    modified_at = models.DateTimeField(auto_now = True)
    created_at = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return str(self.title) + ":" + str(self.from_whom)


class CaseData(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.ForeignKey(Case, on_delete=models.SET_NULL, null=True, related_name="caseName_caseData")
    file = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    url = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class Data(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    
    url = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class OrgData(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    url = models.CharField(max_length=200, null=True, blank=True)
    memo= models.CharField(max_length=512, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



class Scholorship(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True, related_name="semester_scholorship")
    price = models.IntegerField( max_length=200, null = True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


