api = 2
core = 8.x
includes[] = drupal-org-core.make
projects[sector][type] = profile
projects[sector][download][type] = git
projects[sector][download][url] = git://git.drupal.org/project/sector.git
projects[sector][download][branch] = 8.x-1.x

; All 3 MMenu libraries are not included in the drupal-org-core.make because
; they are not in the packing whitelist at http://drupal.org/packaging-whitelist.
libraries[mmenu][download][type] = "get"
libraries[mmenu][download][url] = "https://github.com/BeSite/jQuery.mmenu/archive/v4.7.5.zip"
libraries[mmenu][directory_name] = "mmenu/main"
libraries[mmenu][type] = "library"
libraries[hammer][download][type] = "get"
libraries[hammer][download][url] = "https://github.com/hammerjs/hammer.js/archive/2.0.4.zip"
libraries[hammer][directory_name] = "mmenu/hammer"
libraries[hammer][type] = "library"
libraries[jquery.hammer][download][type] = "get"
libraries[jquery.hammer][download][url] = "https://github.com/hammerjs/jquery.hammer.js/archive/2.0.0.zip"
libraries[jquery.hammer][directory_name] = "mmenu/jquery.hammer"
libraries[jquery.hammer][type] = "library"
