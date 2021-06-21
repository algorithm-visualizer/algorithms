#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nearestSmallerOnRight(vector<int>& heights) {
    stack<int>st;
    vector<int>ans(heights.size(),heights.size());
    for(int i=0;i<heights.size();i++)
    {
        while(!st.empty() && heights[i]<heights[st.top()])
        {
            ans[st.top()]=i;
            st.pop();
        }
        st.push(i);
    }  
    return ans;
}

vector<int> nearestSmallerOnLeft(vector<int>& heights)
{
    stack<int>st;
    vector<int>ans(heights.size(),-1);
    for(int i=heights.size()-1;i>=0;i--)
    {
        while(!st.empty() && heights[i]<heights[st.top()])
        {
            ans[st.top()]=i;
            st.pop();
        }
        st.push(i);
    }
    return ans;
}

int largestRectangleArea(vector<int>& heights)
{
    vector<int>NSR=nearestSmallerOnRight(heights);
    vector<int>NSL=nearestSmallerOnLeft(heights);
    int ans=0;
    for(int i=0;i<heights.size();i++)
        ans=max(ans,(NSR[i]-NSL[i]-1)*heights[i]);
    return ans;
}

int main() {
    vector<int> vec = {2, 1, 5, 6, 2, 3};
    cout << largestRectangleArea(vec);
}
