import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { mergeClasses } from '../../classify';
import Dialog from '../Dialog';
import defaultClasses from './wishlistConfirmRemoveProductDialog.css';

const WishlistConfirmRemoveProductDialog = props => {
    const {
        hasError,
        isOpen,
        isRemovalInProgress,
        onCancel,
        onConfirm
    } = props;

    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, props.classes);

    const dialogTitle = formatMessage({
        id: 'wishlistConfirmRemoveProductDialog.title',
        defaultMessage: 'Remove Product from Wishlist'
    });
    const dialogClasses = {
        confirmButton: classes.confirmButton
    };
    const maybeError = hasError ? (
        <p className={classes.errorMessage}>
            <FormattedMessage
                id={'wishlistConfirmRemoveProductDialog.errorMessage'}
                defaultMessage={
                    'There was an error deleting this product. Please try again later.'
                }
            />
        </p>
    ) : null;

    return (
        <Dialog
            classes={dialogClasses}
            confirmTranslationId={
                'wishlistConfirmRemoveProductDialog.confirmButton'
            }
            isModal={true}
            isOpen={isOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            shouldDisableAllButtons={isRemovalInProgress}
            shouldUnmountOnHide={true}
            title={dialogTitle}
        >
            <div className={classes.root}>
                {maybeError}
                <span className={classes.prompt}>
                    <FormattedMessage
                        id={
                            'wishlistConfirmRemoveProductDialog.confirmationPrompt'
                        }
                        defaultMessage={
                            'Are you sure you want to delete this product from the list?'
                        }
                    />
                </span>
            </div>
        </Dialog>
    );
};

export default WishlistConfirmRemoveProductDialog;

WishlistConfirmRemoveProductDialog.propTypes = {
    classes: shape({
        confirmButton: string,
        errorMessage: string,
        prompt: string,
        root: string
    }),
    hasError: bool,
    isOpen: bool,
    isRemovalInProgress: bool,
    onCancel: func,
    onConfirm: func
};