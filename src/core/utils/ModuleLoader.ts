import { Router } from "express";
import { BaseRouter } from "@core/routes/BaseRoutes";
import * as fs from "fs";
import * as path from "path";

export interface ModuleInfo {
  name: string;
  path: string;
  router: BaseRouter;
}

export class ModuleLoader {
  private static readonly MODULES_PATH = path.join(__dirname, "../../modules");

 
  public static async loadModules(): Promise<ModuleInfo[]> {
    const modules: ModuleInfo[] = [];
    
    try {
      const moduleDirectories = fs.readdirSync(this.MODULES_PATH, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const moduleName of moduleDirectories) {
        const moduleInfo = await this.loadModule(moduleName);
        if (moduleInfo) {
          modules.push(moduleInfo);
        }
      }

      return modules;
    } catch (error) {
      console.error("Erro ao carregar módulos:", error);
      return [];
    }
  }

  private static async loadModule(moduleName: string): Promise<ModuleInfo | null> {
    try {
      const modulePath = path.join(this.MODULES_PATH, moduleName);
      const routesPath = path.join(modulePath, "routes");
      
      if (!fs.existsSync(routesPath)) {
        return null;
      }

      const routeFiles = fs.readdirSync(routesPath)
        .filter(file => file.endsWith('.routes.ts') || file.endsWith('.routes.js'));

      if (routeFiles.length === 0) {
        return null;
      }

      const routeFile = routeFiles[0];
      const routeModulePath = path.join(modulePath, "routes", routeFile);
      
      const routeModule = require(routeModulePath);
      
      const RouterClass = Object.values(routeModule).find(
        (exported: any) => 
          exported && 
          typeof exported === 'function' && 
          exported.prototype instanceof BaseRouter
      ) as any;

      if (!RouterClass) {
        return null;
      }

      const router = new RouterClass();

      return {
        name: moduleName,
        path: `/api/${moduleName}`,
        router
      };

    } catch (error) {
      console.error(`Erro ao carregar módulo ${moduleName}:`, error);
      return null;
    }
  }

  public static async registerModules(app: any): Promise<void> {
    const modules = await this.loadModules();
    
    for (const module of modules) {
      try {
        app.use(module.path, module.router.getRouter());
      } catch (error) {
        console.error(`Erro ao registrar módulo '${module.name}':`, error);
      }
    }
  }
}
