import { Component } from '@angular/core';
import { DropDownElement } from 'app/shared/models/drop-down-element';
import { DeploymentCenterWizardService } from 'app/site/deployment-center/deployment-center-setup/WizardLogic/deployment-center-wizard-service';
import { PortalService } from 'app/shared/services/portal.service';
import { CacheService } from 'app/shared/services/cache.service';
import { ArmService } from 'app/shared/services/arm.service';
import { AiService } from 'app/shared/services/ai.service';
import { Constants } from 'app/shared/models/constants';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
    selector: 'app-configure-github',
    templateUrl: './configure-github.component.html',
    styleUrls: ['./configure-github.component.scss', '../step-configure.component.scss']
})
export class ConfigureGithubComponent {
    private _resourceId: string;
    public OrgList: DropDownElement<string>[];
    public RepoList: DropDownElement<string>[];
    public BranchList: DropDownElement<string>[];

    private reposStream = new ReplaySubject<string>();
    private orgStream = new ReplaySubject<string>();
    constructor(
        private _wizard: DeploymentCenterWizardService,
        _portalService: PortalService,
        private _cacheService: CacheService,
        _armService: ArmService,
        _aiService: AiService
    ) {
        this.orgStream.subscribe(r => {
          this.fetchRepos(r);
        });
        this.reposStream.subscribe(r => {
          this.fetchBranches(r);
        });

        this._wizard.sourceControlProvider$.subscribe(provider => {
            this.fetchOrgs();
        });
        this._wizard.resourceIdStream.subscribe(r => {
            this._resourceId = r;
        });
    }

    fetchOrgs() {
        return Observable.zip(
            this._cacheService.post(Constants.serviceHost + 'api/github/passthrough?orgs=', true, null, {
                url: 'https://api.github.com/user/orgs'
            }),
            this._cacheService.post(Constants.serviceHost + 'api/github/passthrough?user=', true, null, {
                url: 'https://api.github.com/user'
            }),
            (orgs, user) => ({
                orgs: orgs.json(),
                user: user.json()
            })
        ).subscribe(r => {
            const newOrgsList: DropDownElement<string>[] = [];
            newOrgsList.push({
                displayLabel: r.user.login,
                value: r.user.repos_url
            });

            r.orgs.forEach(org => {
                newOrgsList.push({
                    displayLabel: org.login,
                    value: org.repos_url
                });
            });

            this.OrgList = newOrgsList;
        });
    }

    fetchRepos(org: string) {
        if (org) {
            this.RepoList = [];
            this._cacheService
                .post(Constants.serviceHost + `api/github/passthrough?repo=${org}`, true, null, {
                    url: org
                })
                .subscribe(r => {
                    const newRepoList: DropDownElement<string>[] = [];

                    r.json().forEach(repo => {
                        newRepoList.push({
                            displayLabel: repo.name,
                            value: repo.full_name
                        });
                    });

                    this.RepoList = newRepoList;
                });
        }
    }

    fetchBranches(repo: string) {
        if (repo) {
            this.BranchList = [];
            this._cacheService
                .post(Constants.serviceHost + `api/github/passthrough?branch=${repo}`, true, null, {
                    url: `https://api.github.com/repos/${repo}/branches`
                })
                .subscribe(r => {
                    const newBranchList: DropDownElement<string>[] = [];

                    r.json().forEach(branch => {
                        newBranchList.push({
                            displayLabel: branch.name,
                            value: branch.full_name
                        });
                    });

                    this.BranchList = newBranchList;
                });
        }
    }

    RepoChanged(repo: string) {
        this.reposStream.next(repo);
    }

    OrgChanged(org: string) {
        this.orgStream.next(org);
    }

    BranchChanged(branch: string) {
    }
}
