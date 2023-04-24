import { JsCoq } from '../../../node_modules/jscoq/jscoq';

export const jscoq_ids  = ['.coq-code'];
export const jscoq_opts = {
    prelude:       true,
    prelaunch:     false,
    implicit_libs: true,
    editor:        { mode: { 'company-coq': true } },
    init_pkgs:     ['init'],
    all_pkgs:      ['coq', 'mathcomp']
};

export default JsCoq;