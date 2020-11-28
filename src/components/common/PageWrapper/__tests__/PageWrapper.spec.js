/*
 * Copyright (c) 2020 MariaDB Corporation Ab
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file and at www.mariadb.com/bsl11.
 *
 * Change Date: 2024-10-14
 *
 * On the date above, in accordance with the Business Source License, use
 * of this software will be governed by version 2 or later of the General
 * Public License.
 */

import { expect } from 'chai'
import mount from '@tests/unit/setup'
import PageWrapper from '@/components/common/PageWrapper'

describe('PageWrapper.vue', () => {
    let wrapper

    beforeEach(async () => {
        localStorage.clear()
        wrapper = mount({
            shallow: false,
            component: PageWrapper,
        })
    })

    it(`Should render accurate content when default slot is used`, async () => {
        wrapper = mount({
            shallow: true,
            component: PageWrapper,
            slots: {
                default: '<div class="dashboard-page">dashboard-page</div>',
            },
        })
        expect(wrapper.find('.dashboard-page').text()).to.be.equal('dashboard-page')
    })
})
