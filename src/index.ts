import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss';

import { AppController } from 'components/app/app.controller';
import { AppModel } from 'components/app/app.model';
import { AppView } from 'components/app/app.view';

new AppController(new AppModel(), new AppView());
