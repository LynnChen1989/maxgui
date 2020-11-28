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

import chai, { expect } from 'chai'
import mount from '@tests/unit/setup'
import PageHeader from '@/pages/FilterDetail/PageHeader'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { dummy_all_filters, triggerBtnClick, openConfirmDialog } from '@tests/unit/utils'

chai.should()
chai.use(sinonChai)

describe('FilterDetail - PageHeader', () => {
    let wrapper, axiosStub

    beforeEach(async () => {
        wrapper = mount({
            shallow: false,
            component: PageHeader,
            props: {
                currentFilter: dummy_all_filters[0],
            },
        })
        axiosStub = sinon.stub(wrapper.vm.$axios, 'delete').returns(Promise.resolve())
    })

    afterEach(async () => {
        await axiosStub.restore()
    })

    it(`Should pass necessary props to confirm-dialog`, async () => {
        const confirmDialog = wrapper.findComponent({ name: 'confirm-dialog' })
        expect(confirmDialog.exists()).to.be.true
        const { title, type, item, onSave, onClose, onCancel } = confirmDialog.vm.$props
        const { dialogTitle, dialogType } = wrapper.vm.$data
        expect(title).to.be.equals(dialogTitle)
        expect(type).to.be.equals(dialogType)
        expect(item).to.be.deep.equals(wrapper.vm.$props.currentFilter)
        expect(onSave).to.be.equals(wrapper.vm.confirmSave)
        expect(onClose).to.be.equals(wrapper.vm.handleClose)
        expect(onCancel).to.be.equals(wrapper.vm.handleClose)
    })

    it(`Should open confirm-dialog when delete button is clicked`, async () => {
        await openConfirmDialog({ wrapper, cssSelector: '.delete-btn' })
        expect(wrapper.vm.showConfirmDialog).to.be.true
    })

    it(`Should send delete request after confirming delete`, async () => {
        await openConfirmDialog({ wrapper, cssSelector: '.delete-btn' })
        const confirmDialog = wrapper.findComponent({ name: 'confirm-dialog' })
        await triggerBtnClick(confirmDialog, '.save')

        await axiosStub.should.have.been.calledWith(`/filters/${dummy_all_filters[0].id}?force=yes`)
    })
})
