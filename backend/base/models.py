from django.db import models

from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
# Create your models here.

class SocialAccount(models.Model):
    provider = models.CharField(max_length=200, default='google') # 若未來新增其他的登入方式,如Facebook,GitHub...
    unique_id = models.CharField(max_length=200)
    user = models.ForeignKey(
        User, related_name='social', on_delete=models.CASCADE)


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
        return self.name

class ContributeContext(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    context = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.context

class ContributeItem(models.Model):
    item_name = models.ForeignKey(ContributeContext, on_delete=models.SET_NULL, null=True,related_name="contribute_context")
    student_name = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True,related_name="contribute_studnet")
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True, default=0)
    month = models.DecimalField(
        max_digits=7, decimal_places=1, null=True, blank=True)
    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
class Case(models.Model):
    case_no = models.CharField(max_length=200, null=True, blank=True)
    student_name = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name="student")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now = True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.student_name

class Finance(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    status = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    name = models.ForeignKey(Case, on_delete=models.SET_NULL, null=True,related_name="finance_case")
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    unit = models.CharField(max_length=200, null=True, blank=True,default='TWD')
    create_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,related_name="finance_user")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

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
    applied_date = models.DateTimeField()
    end_date = models.DateTimeField()
    price = models.IntegerField( max_length=200, null = True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
