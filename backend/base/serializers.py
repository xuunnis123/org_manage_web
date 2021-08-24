from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from google.oauth2 import id_token

from google.auth.transport import requests
from backend.settings import SOCIAL_GOOGLE_CLIENT_ID
from .models import *

class SocialLoginSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)

    def verify_token(self, token):
        """
        驗證 id_token 是否正確

        token: JWT
        """
        try:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), SOCIAL_GOOGLE_CLIENT_ID)
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            if idinfo['aud'] not in [SOCIAL_GOOGLE_CLIENT_ID]:
                raise ValueError('Could not verify audience.')
            # Success
            return idinfo
        except ValueError:
            pass

    def create(self, validated_data):
        idinfo = self.verify_token(validated_data.get('token'))
        if idinfo:
            # User not exists
            if not SocialAccount.objects.filter(unique_id=idinfo['sub']).exists():
                user = User.objects.create_user(
                    username=f"{idinfo['name']} {idinfo['email']}", # Username has to be unique
                    first_name=idinfo['given_name'],
                    last_name=idinfo['family_name'],
                    email=idinfo['email']
                )
                SocialAccount.objects.create(
                    user=user,
                    unique_id=idinfo['sub']
                )
                return user
            else:
                social = SocialAccount.objects.get(unique_id=idinfo['sub'])
                return social.user
        else:
            raise ValueError("Incorrect Credentials")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['title'] = user.title
        return token

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True)
    _id = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
          model = User
          fields = ['id','_id','username','email','name','isAdmin','token']
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class CaseSerializer(serializers.ModelSerializer):
    scholarship = serializers.SerializerMethodField(read_only = True)
    
    student = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = Case
        fields = '__all__'

    def get_scholarship(self, obj):
        try:

            scholarship = obj.scholarship
        except :
            scholarship = None

        serializer = ScholarshipSerializer(scholarship, many=True)
        return serializer.data

    
    
    def get_student(self, obj):
        
        student = obj.student_name
        serializer = StudentSerializer(student, many=False)
        return serializer.data

    
    


class MemberSerializer(serializers.ModelSerializer):
    family = serializers.SerializerMethodField(read_only = True)
    intro_by = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Member
        fields = '__all__'
    
    def get_family(self, obj):
        family_one = obj.family
    
        serializer = MemberSerializer(family_one, many=False)
       
        return serializer.data['name']

    def get_intro_by(self, obj):
        intro_by_one = obj.intro_by
        serializer = MemberSerializer(intro_by_one, many=False)
        
        return serializer.data['name']

    
class StudentSerializer(serializers.ModelSerializer):
    school = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = Student
        fields = '__all__'
    

    def get_school(self, obj):
        school_one = obj.school
        
        serializer = SchoolSerializer(school_one, many=False)
       
        return serializer.data['name']
class OutcomeMoneyCategorySerilizer(serializers.ModelSerializer):
    class Meta:
            model = OutcomeMoneyCategory
            fields = '__all__'

class IncomeMoneyCategorySerilizer(serializers.ModelSerializer):
    class Meta:
            model = IncomeMoneyCategory
            fields = '__all__'

class IncomeContributeContextSerilizer(serializers.ModelSerializer):
    class Meta:
            model = IncomeContributeContext
            fields = '__all__'

class OutcomeContributeContextSerilizer(serializers.ModelSerializer):
    class Meta:
            model = OutcomeContributeContext
            fields = '__all__'

class IncomeSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(read_only = True)
    title = serializers.SerializerMethodField(read_only = True)
    from_whom = serializers.SerializerMethodField(read_only = True)
    confirmed_person = serializers.SerializerMethodField(read_only = True)


    class Meta:
        model = InCome
        fields = '__all__'
    

    def get_category(self, obj):
        category_one = obj.category
        
        serializer = IncomeMoneyCategorySerilizer(category_one, many=False)
        
        return serializer.data['name']
    def get_title(self, obj):
        title_one = obj.title
        
        serializer = IncomeContributeContextSerilizer(title_one, many=False)
        
        return serializer.data['context']

    def get_from_whom(self, obj):
        member_one = obj.from_whom
        
        serializer = MemberSerializer(member_one, many=False)
        
        return serializer.data['name']

    def get_confirmed_person(self, obj):
        member_one = obj.confirmed_person
        
        serializer = MemberSerializer(member_one, many=False)
       
        return serializer.data['name']

class OutcomeSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(read_only = True)
    title = serializers.SerializerMethodField(read_only = True)
    to_whom = serializers.SerializerMethodField(read_only = True)
    confirmed_person = serializers.SerializerMethodField(read_only = True)


    class Meta:
        model = OutCome
        fields = '__all__'

    def get_category(self, obj):
        category_one = obj.category
        
        serializer = OutcomeMoneyCategorySerilizer(category_one, many=False)
        
        return serializer.data['name']
    def get_title(self, obj):
        title_one = obj.title
        
        serializer = OutcomeContributeContextSerilizer(title_one, many=False)
        
        return serializer.data['context']

    def get_to_whom(self, obj):
        to_whom_one = obj.to_whom
        
        serializer = StudentSerializer(to_whom_one, many=False)
        
        return serializer.data['name']

    def get_confirmed_person(self, obj):
        member_one = obj.confirmed_person
        
        serializer = MemberSerializer(member_one, many=False)
       
        return serializer.data['name']

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class ScholarshipSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True)
    semester = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = Scholarship
        fields = '__all__'

    def get_name(self, obj):
        studentname = obj.name
        
        serializer = StudentSerializer(studentname, many=False)
        
        return serializer.data['name']

    def get_semester(self, obj):
        semesterone = obj.semester
        
        serializer = SemesterSerializer(semesterone, many=False)
        
        return serializer.data['name']

class ScholarshipWithOutcomeRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScholarshipWithOutcomeRelation
        fields = '__all__'

class StudentsPhotoLinkSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = StudentsPhotoLink
        fields = '__all__'

    def get_student_name(self, obj):
        studentname = obj.student_name
        
        serializer = StudentSerializer(studentname, many=False)
        
        return serializer.data['name']