using PhotoGallery.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoGallery.Infrastructure.Services
{
    public interface IPhotoService
    {

        Photo uploadPhoto(string Title, string Uri, int albumID);
        Photo GetPhoto(int photoID);
    }
}