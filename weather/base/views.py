from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView,UpdateView,DeleteView,FormView
from django.contrib.auth.views import LoginView,LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login,logout
from django.views.decorators.http import require_http_methods
# Create your views here.
class CustomLoginView(LoginView):
    template_name='base/login.html'
    fields='__all__'
    redirect_authenticated_user=True
    def get_success_url(self):
        return reverse_lazy('main')
    
def main(request):
    return render(request,'base/index.html')

