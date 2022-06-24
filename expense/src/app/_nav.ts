import { INavData } from '@coreui/angular';
import { LocalData } from './data/LocalData';

// export const roles = LocalData.getRole();

export const navItems: INavData[] = LocalData.setMenu(LocalData.getRole());
