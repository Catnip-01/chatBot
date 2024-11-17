#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<vector<int>> fourSum(vector<int> &nums, int target)
    {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<vector<int>> quads;
        for (int i = 0; i < n; i++)
        {
            if (i > 0 && nums[i - 1] == nums[i])
                continue;
            for (int j = i + 1; j < n; j++)
            {
                if (j > i + 1 && nums[j - 1] == nums[j])
                    continue;
                int k = j + 1;
                int l = n - 1;
                while (k < l)
                {
                    int sum = nums[i];
                    sum += nums[j];
                    sum += nums[k];
                    sum += nums[l];
                    int rem = target - sum;

                    if (rem > 0)
                    {
                        k++;
                    }
                    else if (rem < 0)
                    {
                        l--;
                    }
                    else if (rem == 0)
                    {
                        // zero

                        vector<int> quad = {nums[i], nums[j], nums[k], nums[l]};
                        quads.push_back(quad);
                        while (k < l && nums[k + 1] == nums[k])
                            k++;
                        k++;
                        while (k < l && nums[l - 1] == nums[l])
                            l--;
                        l--;
                    }
                }
            }
        }
        return quads;
    }
};

int getLongestZeroSumSubarrayLength(vector<int> &arr)
{
    int n = arr.size();
    int sum = 0;
    int maxNum = 0;
    map<int, int> m;
    for (int i = 0; i < n; i++)
    {
        sum += arr[i];
        if (m.find(sum) == m.end() && sum != 0)
        {
            m[sum] = i;
        }
        else if (sum == 0)
        {
            cout << "zero found" << endl;
            maxNum = max(maxNum, i + 1);
        }
        else
        {
            maxNum = max(maxNum, i - m[sum]);
        }
    }
    return maxNum;
}
int main()
{

    vector<int> v = {0, 1, 1, 1};
    // Solution sol;
    // vector<vector<int>> triplets = sol.fourSum(v, 8);
    // for (vector<int> triplet : triplets)
    // {
    //     for (auto x : triplet)
    //     {
    //         cout << x << " ";
    //     }
    //     cout << endl;
    // }
    int n = getLongestZeroSumSubarrayLength(v);
    cout << "n : " << n << endl;

    return 0;
}