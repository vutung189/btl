import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { PhotosComponent } from './components/photos.component';
import { AlbumsComponent } from './components/albums.component';
import { AlbumPhotosComponent } from './components/album-photos.component';
import { accountRoutes, accountRouting } from './components/account/routes';
import { ProfileComponent } from './components/account/profile.component';
import { CreateComponent } from './components/create.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'photos',
        component: PhotosComponent
    },
    {
        path: 'albums',
        component: AlbumsComponent
    },
    {
        path: 'createAlbum',
        component: CreateComponent
    },
    {
        path: 'albums/:id/photos',
        component: AlbumPhotosComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
