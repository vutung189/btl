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
        private readonly IAlbumRepository _albumRepository;
        private readonly IUserRepository _userRepository;
        #endregion
        public PhotoService(IPhotoRepository photoRepository, IAlbumRepository albumRepository, IUserRepository userRepository)
        {
            _photoRepository = photoRepository;
            _albumRepository = albumRepository;
            _userRepository = userRepository;
        }

        public Photo uploadPhoto(string title, string uri, int albumID)
        {
            Album album = _albumRepository.GetSingle(albumID);
            Album a = album;
            User user = _userRepository.GetSingle(album.User_ID);

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
