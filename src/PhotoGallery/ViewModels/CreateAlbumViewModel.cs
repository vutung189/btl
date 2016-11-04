using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoGallery.ViewModels
{
    public class CreateAlbumViewModel
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
