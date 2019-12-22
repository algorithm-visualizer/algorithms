#include "algorithm-visualizer.h"

#define N   15
#define MIN 1
#define MAX 20

void BubbleSort(int start, int end, int array[]);

ChartTracer chartTracer("Chart");

int main() {
    int array[N];
    Randomize::Array1D<int>(N, *(new Randomize::Integer(MIN, MAX))).fill(&array[0]);
    chartTracer.set(array);
    Layout::setRoot(VerticalLayout({ chartTracer }));

    BubbleSort(0, N - 1, array);

    return 0;
}

void BubbleSort(int start, int end, int array[])
{
    chartTracer.select(end);

    int newEnd = start;
    for(int i = start; i < end; ++i)
    {
        chartTracer.select(i);
        chartTracer.select(i + 1);
        Tracer::delay();
        if(array[i] > array[i + 1])
        {
            std::swap(array[i], array[i + 1]);
            chartTracer.patch(i, array[i]);
            chartTracer.patch(i + 1, array[i + 1]);
            Tracer::delay();
            chartTracer.depatch(i);
            chartTracer.depatch(i + 1);
            newEnd = i;
        }

        chartTracer.deselect(i);
        chartTracer.deselect(i + 1);
    }

    if(newEnd == start)
    {
        return;
    }
    else
    {
        BubbleSort(start, newEnd, array);
    }
}
