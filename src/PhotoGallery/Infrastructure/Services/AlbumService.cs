using PhotoGallery.Entities;
using PhotoGallery.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace PhotoGallery.Infrastructure.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IUserRepository _userRepository;
        private static PhotoGalleryContext context;
        #region Variables
        private readonly IAlbumRepository _albumRepository;
        #endregion
        public AlbumService(IAlbumRepository albumRepository, IUserRepository userRepository)
        {
            _albumRepository = albumRepository;
            _userRepository = userRepository;
        }




        public Album CreateAlbum(string title, string description, string username)
        {
            User user = _userRepository.GetSingleByUsername(username);
            var UserID = user.Id;
            var album = new Album() {
                Title = title,
                Description = description,
                DateCreated = DateTime.Now,
                User_ID = user.Id
            };

            _albumRepository.Add(album);
            _albumRepository.Commit();
            return album;
        }

        public Album GetAlbum(int albumID)
        {
            return _albumRepository.GetSingle(albumID);
        }

    }
}
