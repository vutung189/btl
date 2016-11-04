using PhotoGallery.Entities;
using PhotoGallery.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace PhotoGallery.Infrastructure.Services
{
    public class PhotoService : IPhotoService
    {
        private static PhotoGalleryContext context;
        #region Variables
        private readonly IPhotoRepository _photoRepository;
        #endregion
        public PhotoService(IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }

        public Photo uploadPhoto(string title, string uri, int albumID)
        {
            Album album = context.Albums.FirstOrDefault(s => s.Id == albumID);
            User user = context.Users.FirstOrDefault(s => s.Id == album.User_ID);

            var photo = new Photo() {
                Title = title,
                Uri = uri,
                AlbumId = albumID,
                Username = user.Username,
                DateUploaded = DateTime.Now
            };
            _photoRepository.Add(photo);
            _photoRepository.Commit();
            return photo;
        }

        Photo IPhotoService.GetPhoto(int photoID)
        {
            return _photoRepository.GetSingle(photoID);
        }
    }
}
