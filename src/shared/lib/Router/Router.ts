import { Block } from '@shared/lib/Block';
import { PagesPaths } from './model';
import { Route } from './Route';

export class Router {
    public routes: Route[]

    public history: History

    private _currentRoute: Route | undefined

    private _rootQuery: string

    static __instance: Router

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance
        }
        this.routes = []
        this.history = window.history
        this._currentRoute = undefined
        this._rootQuery = rootQuery

        Router.__instance = this
    }

    use(pathname: PagesPaths, block: Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery })
        this.routes.push(route);
        return this
    }

    async guard(redirectTo: PagesPaths, callback: () => boolean | Promise<boolean>) {
        const result = await callback()

        if (!result) {
            this.go(redirectTo)
        }
        return this
    }

    start() {
        window.onpopstate = ((event) => {
            const currentWindow = event.currentTarget as Window;
            this._onRoute(currentWindow.location.pathname as PagesPaths)
        })

        this._onRoute(window.location.pathname as PagesPaths)
    }

    _onRoute(pathname: PagesPaths) {
        let route = this.getRoute(pathname);

        if (!route) {
            route = this.getRoute(PagesPaths.ERROR_CLIENT)
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }

        this._currentRoute = route;

        route?.render()
    }

    go(pathname: PagesPaths) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: PagesPaths) {
        return this.routes.find((route) => route.match(pathname))
    }
}

export const router = new Router('#app')
