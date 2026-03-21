
class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
                <div class="container-fluid"><a class="navbar-brand" href="index.html">Duck Tapes</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
                        aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation"><span
                        class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbar">
                        <!-- links -->
                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                            <li class="nav-item"><a class="nav-link active" aria-current="page" href="index.html">Main Version</a></li>
                            <li class="nav-item"><a class="nav-link active" href="alternative.html">Alternative Version</a></li>
                            <!--<li class="nav-item"><a class="nav-link disabled" href="alternative.html" aria-disabled="true">Alternative Version</a></li>-->
                            <li class="nav-item"><a class="nav-link active" href="statistics.html">Statistics</a></li>
                        </ul>
                        
                        <!-- rechts -->
                        <ul class="navbar-nav ms-auto mb-2 mb-md-0 d-flex align-items-center gap-2">
                            <!--<li class="nav-item dropdown"> 
                                <a class="nav-link dropdown-toggle active" href="#" data-bs-toggle="dropdown" aria-expanded="false">User auswählen</a> 
                                <ul class="dropdown-menu"> 
                                    <li><a class="dropdown-item" href="#">Action</a></li> 
                                    <li><a class="dropdown-item" href="#">Another action</a></li> 
                                    <li><a class="dropdown-item" href="#">Something else here</a></li> 
                                </ul> 
                            </li>-->
                            
                            <li class="nav-item dropdown">
                                <a id="userDropdownButton" class="nav-link dropdown-toggle active" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                  User auswählen
                                </a>
                                
                                <ul id="userDropdownMenu" class="dropdown-menu"></ul>
                            </li>
                            
                            <li>
                                <div class="d-flex align-items-center">
                                    <span class="text-white"><i class="fa-solid fa-sun me-2"></i></span>
                                    
                                    <div class="form-check form-switch m-0">
                                        <input class="form-check-input" type="checkbox" id="themeToggle">
                                    </div>
                                    
                                    <span class="text-white"><i class="fa-solid fa-moon me-2"></i></span>
                                </div>
                            </li>
                        </ul>  
                    </div>
                </div>
        </nav>
    `;
    }
}

customElements.define("my-navbar", Navbar);
