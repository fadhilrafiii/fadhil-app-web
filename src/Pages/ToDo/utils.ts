import { useCallback, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';

import { getListActivities } from 'Clients/activity/list';

import { Activity } from 'Shared/Types/Activity';
import { FetchData } from 'Shared/Types/FetchData';

export const useActivitiesList = () => {
  const [allActivities, setAllActivities] = useState<FetchData<Activity[]>>({
    shouldFetchData: true,
    data: [],
  });

  const getAllActivitiesList = useCallback(async () => {
    await getListActivities().then((res: AxiosResponse) =>
      setAllActivities({
        shouldFetchData: false,
        data: res.data,
      }),
    );
  }, []);

  const triggerFetchAllActivities = () =>
    setAllActivities((prev: FetchData<Activity[]>) => ({ ...prev, shouldFetchData: true }));

  useEffect(() => {
    if (allActivities.shouldFetchData) getAllActivitiesList();
  }, [allActivities.shouldFetchData, getAllActivitiesList]);

  return {
    allActivities: allActivities.data,
    triggerFetchAllActivities,
  };
};
