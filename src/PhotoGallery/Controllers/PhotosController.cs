using System;
//using System.Web.HttpContex;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using PhotoGallery.Entities;
using PhotoGallery.ViewModels;
using AutoMapper;
using PhotoGallery.Infrastructure.Services;
using PhotoGallery.Infrastructure.Repositories;
using PhotoGallery.Infrastructure.Core;
using Microsoft.AspNetCore.Hosting;
using System.IO;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PhotoGallery.Controllers
{
    [Route("api/[controller]")]
    public class PhotosController : Controller
    {
        private IHostingEnvironment _environment;
        IPhotoRepository _photoRepository;
        ILoggingRepository _loggingRepository;
        public PhotosController(IPhotoRepository photoRepository, ILoggingRepository loggingRepository, IHostingEnvironment environment)
        {
            _environment = environment;
            _photoRepository = photoRepository;
            _loggingRepository = loggingRepository;
        }

        [HttpGet("{page:int=0}/{pageSize=12}")]
        public PaginationSet<PhotoViewModel> Get(int? page, int? pageSize)
        {
            PaginationSet<PhotoViewModel> pagedSet = null;

            try
            {
                int currentPage = page.Value;
                int currentPageSize = pageSize.Value;

                List<Photo> _photos = null;
                int _totalPhotos = new int();


                _photos = _photoRepository
                    .AllIncluding(p => p.Album)
                    .OrderBy(p => p.Id)
                    .Skip(currentPage * currentPageSize)
                    .Take(currentPageSize)
                    .ToList();

                _totalPhotos = _photoRepository.GetAll().Count();

                IEnumerable<PhotoViewModel> _photosVM = Mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoViewModel>>(_photos);

                pagedSet = new PaginationSet<PhotoViewModel>()
                {
                    Page = currentPage,
                    TotalCount = _totalPhotos,
                    TotalPages = (int)Math.Ceiling((decimal)_totalPhotos / currentPageSize),
                    Items = _photosVM
                };
            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return pagedSet;
        }

        //Time Line for Home
        [HttpGet]
        [Route("timeLine")]
        public IActionResult timeLine()
        {
            IActionResult _result = new ObjectResult(false);
            List<Photo> _photos = null;
            _photos = _photoRepository
                .AllIncluding(p => p.Album)
                .OrderByDescending(p => p.DateUploaded)
                .ToList();

            IEnumerable<PhotoViewModel> _photosVM = Mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoViewModel>>(_photos);




            _result = new ObjectResult(_photosVM);
            return _result;
        }


        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            IActionResult _result = new ObjectResult(false);
            GenericResult _removeResult = null;

            try
            {
                Photo _photoToRemove = this._photoRepository.GetSingle(id);
                this._photoRepository.Delete(_photoToRemove);
                this._photoRepository.Commit();

                _removeResult = new GenericResult()
                {
                    Succeeded = true,
                    Message = "Photo removed."
                };
            }
            catch (Exception ex)
            {
                _removeResult = new GenericResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };

                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            _result = new ObjectResult(_removeResult);
            return _result;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> upload(ICollection<IFormFile> files, int ID_Album)
        {
            IActionResult _result = new ObjectResult(false);
            GenericResult _registrationResult = null;
            //System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            var uploads = Path.Combine(_environment.WebRootPath, "uploads");

            try
            {
                if (files != null)
                {
                    var file = files.ElementAt(0);
                    using (var fileStream = new FileStream(Path.Combine(uploads, file.FileName), FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    string imageName = file.FileName;
                    string imagePath = uploads;

                    //filse.


                    PhotoService _photoService = new PhotoService(_photoRepository);
                    Photo _photo = _photoService.uploadPhoto(imageName, imagePath, ID_Album);

                    if (_photo != null)
                    {
                        _registrationResult = new GenericResult()
                        {
                            Succeeded = true,
                            Message = "upload Photo succeeded"
                        };
                    }
                }
                else
                {
                    _registrationResult = new GenericResult()
                    {
                        Succeeded = false,
                        Message = "Invalid fields."
                    };
                }
            }
            catch (Exception ex)
            {
                _registrationResult = new GenericResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };

                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            _result = new ObjectResult(_registrationResult);
            return _result;
        }
    }
}
