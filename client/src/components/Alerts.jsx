import React, { useEffect, useState, useRef } from 'react';
import { renderSmallImage } from '../utils/rendeImage';
import FlexContainer from './FlexContainer';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from '../features/replies/alertsSlice';
import { deleteAlerts, deleteSingleAlert, getAlerts } from '../features/replies/alertsThunks';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { getLocalStorage } from '../utils/localStorage/localStorage';
import customFetch from '../utils/axios/customFetch';
import { toast } from 'react-toastify';

const alertsContainerClasses =
  'absolute top-[40px] -translate-x-1/2 z-50 left-1/2 shadow-md min-w-[300px] bg-accent p-2 text-xs';

const Alerts = () => {
  const dispatch = useDispatch();
  const alertsRef = useRef();
  const alertsButtonRef = useRef();
  const { user } = useSelector((store) => store.user);
  const { alerts } = useSelector((store) => store.alerts);

  const [areAlertsShown, setAreAlertsShown] = useState(false);

  const handleGetAlertsClick = () => {
    setAreAlertsShown(true);
    dispatch(getAlerts());
  };

  const handleFollowResponseClick = async (alertFrom, status) => {
    const { token } = getLocalStorage('user');
    const body = { status, followerId: alertFrom };

    try {
      const { data } = await customFetch.post(`/follow/response`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  const handleClearAlertsClick = () => {
    dispatch(deleteAlerts());
  };

  const handlePostAlertClick = (placeId) => dispatch(deleteSingleAlert(placeId));

  // Event Listener From Server
  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_SERVER_URL}/api/v1/sse`);

    console.log(eventSource);

    eventSource.addEventListener('alert', (e) => {
      const { type, data } = JSON.parse(e.data);
      const { first_name: firstName, last_name: lastName } = data;

      const name = firstName + ' ' + lastName;

      data.userId = user.id;
      if (type === 'follow') {
        data.message = `${name} requested to follow you`;
      } else if (type === 'post') {
        data.message = `${name} added a new post`;
      } else if (type === 'tag') {
        data.message = `${name} tagged you in a comment`;
      } else if (type === 'comment') {
        data.message = `${name} commented on your post`;
      } else if (type === 'reply') {
        data.message = `${name} replied to your comment`;
      } else if (type === 'like') {
        data.message = `${name} liked your comment`;
      }
      dispatch(addAlert(data));
    });

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    dispatch(getAlerts());
  }, [areAlertsShown]);

  const renderAlerts = () =>
    alerts.map((alert, index) => {
      const {
        id,
        first_name: firstName,
        last_name: lastName,
        type,
        image,
        alert_from: alertFrom,
        place_id: placeId,
      } = alert;

      if (type === 'follow') {
        return (
          <GenericAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            text='requested to follow you.'
          >
            <Button responseButton onClick={handleFollowResponseClick.bind(null, alertFrom, 'accepted')}>
              <AiOutlineCheckCircle />
            </Button>
            <Button responseButton onClick={handleFollowResponseClick.bind(null, alertFrom, 'declined')}>
              <AiOutlineCloseCircle />
            </Button>
          </GenericAlert>
        );
      }

      if (type === 'post') {
        return (
          <GenericAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            onClick={handlePostAlertClick}
            placeId={placeId}
            alertId={id}
            text='added a new post.'
          ></GenericAlert>
        );
      }

      if (type === 'tag') {
        return (
          <GenericAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            onClick={handlePostAlertClick}
            placeId={placeId}
            alertId={id}
            text='tagged you in a comment.'
          ></GenericAlert>
        );
      }

      if (type === 'comment') {
        return (
          <GenericAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            onClick={handlePostAlertClick}
            placeId={placeId}
            alertId={id}
            text='posted a comment on your post.'
          ></GenericAlert>
        );
      }

      if (type === 'reply') {
        return (
          <GenericAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            onClick={handlePostAlertClick}
            placeId={placeId}
            alertId={id}
            text='replied to your comment.'
          ></GenericAlert>
        );
      }

      if (type === 'like') {
        return (
          <GenericAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            onClick={handlePostAlertClick}
            placeId={placeId}
            alertId={id}
            text='liked your comment.'
          ></GenericAlert>
        );
      }
    });

  const renderAlertsCount = () => {
    if (alerts.length > 0)
      return (
        <FlexContainer center className='absolute -top-2 -right-4 bg-white h-4 w-4 rounded-full text-dark-gray text-xs'>
          {alerts.length}
        </FlexContainer>
      );
  };

  const renderClearButtonOrText = () => {
    if (alerts.length > 0)
      return (
        <Button onClick={handleClearAlertsClick} className='text-off-white block w-full text-right'>
          clear all
        </Button>
      );
    else return <p className='text-center'>no notifications</p>;
  };

  window.addEventListener('click', (e) => {
    if (e.target !== alertsButtonRef.current && e.target !== alertsRef.current) setAreAlertsShown(false);
  });

  return (
    <div className='relative'>
      <Button onClick={handleGetAlertsClick} ref={alertsButtonRef}>
        alerts
      </Button>
      {areAlertsShown && (
        <div ref={alertsRef} className={alertsContainerClasses}>
          {renderClearButtonOrText()}
          {renderAlerts()}
        </div>
      )}
      {renderAlertsCount()}
    </div>
  );
};

export default Alerts;

const GenericAlert = ({ image, firstName, lastName, alertFrom, placeId, alertId, onClick, text, children }) => {
  return (
    <FlexContainer gap alignCenter className='bg-accent p-2'>
      <div className='h-8 w-8 shrink-0 rounded-full overflow-hidden'>
        {renderSmallImage(image, firstName, lastName)}
      </div>
      <p className='whitespace-nowrap flex-1'>
        <Link to={'/people/' + alertFrom} className='mr-1 hover:underline'>
          {firstName} {lastName}
        </Link>
        <Link to={'places/' + placeId} onClick={onClick?.bind(null, alertId)} className='lowercase'>
          {text}
        </Link>
      </p>
      {children}
    </FlexContainer>
  );
};

const Button = React.forwardRef((props, ref) => {
  const { onClick, responseButton, children, className } = props;

  const buttonClasses = classnames(className, 'capitalize', {
    'hover:text-dark-gray duration-200 text-xl': responseButton,
  });

  return (
    <button ref={ref} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
});
