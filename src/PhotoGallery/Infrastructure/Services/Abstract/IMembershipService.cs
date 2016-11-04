using PhotoGallery.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoGallery.Infrastructure.Services
{
    public interface IMembershipService
    {
        MembershipContext ValidateUser(string username, string password);
        User CreateUser(string username, string email, string password, int[] roles);
        User Update(string Username, string Password);
        User GetUser(int userId);
        List<Role> GetUserRoles(string username);
    }
}
